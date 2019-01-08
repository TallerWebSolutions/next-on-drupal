SHELL := /bin/bash # Use bash syntax

export USER_ID=$(shell id -u)
export TZ=America/Sao_Paulo
export GROUP_ID=$(shell if [ `id -g` == '20' ]; then echo '1000'; else echo `id -g`; fi)

run:
	touch docker/.bash_history
	docker-compose run --service-ports --rm dashboard-dev

build:
	docker-compose -f docker-compose.yml up -d

in:
	docker exec -it $(shell docker-compose ps -q dashboard-dev) /bin/bash

stop:
	docker-compose stop

clean:
	docker-compose down
	docker rmi dashboard-dev
