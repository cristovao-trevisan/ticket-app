docker run --rm --name pg-docker -e POSTGRES_PASSWORD=$DB_PASSWORD -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/10/data postgres:10
