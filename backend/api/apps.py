from django.apps import AppConfig
from django.db.models.signals import post_migrate

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # This connects the 'sync_data' command to the migration process
        from django.db.models.signals import post_migrate
        from django.core.management import call_command

        def run_seeding(sender, **kwargs):
            try:
                # Automatically calls your new command after migrations finish
                call_command('sync_data')
            except Exception as e:
                print(f"Auto-seed failed: {e}")

        post_migrate.connect(run_seeding, sender=self)