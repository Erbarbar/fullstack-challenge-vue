import requests
from django.core.management.base import BaseCommand
from api.models import UserProfile, Product, Review

class Command(BaseCommand):
    help = 'Fetches and populates data from DummyJSON API'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('🚀 Starting Data Ingestion...'))

        # --- 1. SYNC USERS ---
        try:
            self.stdout.write("Fetching users from DummyJSON...")
            user_response = requests.get('https://dummyjson.com/users', timeout=10)
            user_response.raise_for_status()
            users_data = user_response.json().get('users', [])

            users_created = 0
            for u in users_data:
                UserProfile.objects.update_or_create(
                    external_id=u.get('id'),
                    defaults={
                        'first_name': u.get('firstName', 'Unknown'),
                        'last_name': u.get('lastName', 'Unknown'),
                        'age': u.get('age', 0),
                        'gender': u.get('gender', 'N/A'),
                        'image': u.get('image', ''),
                        'university': u.get('university', 'N/A'),
                        'role': u.get('role', 'Unknown'),
                        'state': u.get('address', {}).get('state', 'N/A')
                    }
                )
                users_created += 1
            self.stdout.write(self.style.SUCCESS(f'✅ Successfully synced {users_created} users.'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error syncing users: {e}'))

        # --- 2. SYNC PRODUCTS ---
        try:
            self.stdout.write("Fetching products from DummyJSON...")
            product_response = requests.get('https://dummyjson.com/products', timeout=10)
            product_response.raise_for_status()
            products_data = product_response.json().get('products', [])

            for p in products_data:
                # 1. Update or Create the Product
                products_created = 0
                product, created = Product.objects.update_or_create(
                    product_id=p['id'],
                    defaults={
                        'title': p.get('title', 'Unknown'),
                        'brand': p.get('brand', 'Unknown'),
                        'category': p.get('category', 'Unknown'),
                        'price': p.get('price', 0),
                        'stock': p.get('stock', 0),
                        'image': p.get('thumbnail', '')
                    }
                )

                # 2. Handle Reviews (Idempotent Sync)
                # First, clear old reviews to prevent duplicates/ghosts
                product.reviews.all().delete()

                # Re-add the current reviews from the JSON payload
                for r in p.get('reviews', []):
                    Review.objects.create(
                        product=product,
                        rating=r.get('rating', 0),
                        reviewer_name=r.get('reviewerName', 'Unknown'),
                        comment=r.get('comment', '')
                    )
                products_created += 1
                if created:
                    self.stdout.write(self.style.SUCCESS(f'✨ NEW PRODUCT ADDED: {product.title}'))
                else:
                    self.stdout.write(self.style.WARNING(f'🔄 UPDATED EXISTING: {product.title}'))
            self.stdout.write(self.style.SUCCESS(f'✅ Successfully synced {products_created} products.'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error syncing products: {e}'))

        self.stdout.write(self.style.SUCCESS('🏁 Ingestion Process Complete!'))