from django.db import models

class UserProfile(models.Model):
    external_id = models.IntegerField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=20)
    image = models.URLField(max_length=500)
    university = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default="Member")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Product(models.Model):
    product_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.title

class Review(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.FloatField()
    reviewer_name = models.CharField(max_length=255)
    comment = models.TextField()

    class Meta:
        db_table = 'product_reviews'

    def __str__(self):
        return f"Review for {self.product.title}"