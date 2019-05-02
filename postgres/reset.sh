# clean
flyway -configFiles=./flyway.dev.conf clean
# migrate
flyway -configFiles=./flyway.dev.conf migrate
# populate
flyway -configFiles=./flyway.dev.conf -locations=filesystem:./fixture migrate
