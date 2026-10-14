#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "--- Starting Backend Entrypoint ---"


# 1. Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready at host 'db'..."

until nc -z db 5432; do
  echo "Postgres is not ready yet... retrying in 2 seconds"
  sleep 2
done

echo "PostgreSQL is UP! Proceeding with migrations..."

# 2. Run Migrations (Always necessary to ensure schema is up to date)
echo "Applying database migrations..."
python manage.py migrate --noinput

# 3. Run your Data Sync
# This ensures that every time a developer runs 'docker-compose up',
# the external JSON data is pulled and the DB is updated.
echo "Running data synchronization..."

# 4. Collect Static Files (Important for production-ready images)
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "--- Initialization Complete! ---"

# 5. Execute the CMD from the Dockerfile (e.g., python manage.py runserver)
exec "$@"