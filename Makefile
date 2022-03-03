DEFAULT_SSH_KEY=$$(cat $$(ls -t ~/.ssh/id* | grep -v .pub$$ | head -1))

start:
	SSH_DEPLOYMENT_KEY=${DEFAULT_SSH_KEY} docker-compose up -d
	docker-compose exec localstack awslocal sqs create-queue --queue-name export

stop:
	docker-compose stop

logs:
	docker-compose logs --tail 100 -f

migrate:
	docker-compose run --rm web bash -c "manage.py alembic upgrade head && alembic upgrade head"

bash-web:
	docker-compose exec web bash

bash-worker:
	docker-compose exec worker bash
