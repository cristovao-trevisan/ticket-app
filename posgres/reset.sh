# clean
flyway -configFiles=./db/flyway.dev.conf clean
# migrate
flyway -configFiles=./db/flyway.dev.conf migrate
# populate
flyway -configFiles=./db/flyway.dev.conf -locations=filesystem:./db/fixture migrate
