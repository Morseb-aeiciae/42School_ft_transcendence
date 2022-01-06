#!/bin/bash

# ./manag_docker.sh info : for details

if [ "$1" == "go" ]  ; then
  if [ "$2" == "prod" ]  ; then
        docker volume create dbprod
        docker compose -f docker-compose.prod.yml up --build
    else
        docker compose -f docker-compose.dev.yml up --build
    fi;

elif [ "$1" == "run" ]  ; then

    case $2 in
        "back") 
            if [ "$3" == "prod" ]  ; then
                docker compose -f docker-compose.prod.yml run -p80:3001 backend
            else
                docker compose -f docker-compose.dev.yml run --service-ports backend
            fi;;
        "front")
            if [ "$3" == "prod" ]  ; then
                docker compose -f docker-compose.prod.yml run -p80:3000 frontend
            else
                docker compose -f docker-compose.dev.yml run --service-ports frontend
            fi;;
        "db")
            if [ "$3" == "prod" ]  ; then
                docker compose -f docker-compose.prod.yml run -p80:80 db
            else
                docker compose -f docker-compose.dev.yml run --service-ports db
            fi;;
        "proxy")
            if [ "$3" == "prod" ]  ; then
                docker compose -f docker-compose.prod.yml run -p80:80 reverse-proxy
            else
                docker compose -f docker-compose.dev.yml run --service-ports reverse-proxy
            fi;;
    esac

elif [ "$1" == "clear" ] ; then
    docker system prune -af
    docker volume prune -f
    # find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
    find . -name "dist" -type d -prune -exec rm -rf '{}' +
    rmdir ./src/frontend/cache/


elif [ "$1" == "ps" ] ; then
    docker compose -f docker-compose.dev.yml ps

elif [ "$1" == "info" ] ; then
    echo -e "\e[36m";
    echo -e "|--------------------INFO SCRIPT-----------------------|";
    echo -e "./manag_docker.sh \t\t to ls docker images and docker containers";
    echo -e " ";
    echo -e "./manag_docker.sh clear \t to delete all docker images, docker containers, docker volumes and dev folders for projects (which not running)";
    echo -e " ";
    echo -e "./manag_docker.sh go \t to launch the project";
    echo -e " ";
    echo -e "./manag_docker.sh run {X} \t to launch the folder's project X";
    echo -e "./manag_docker.sh run {X} dev \t to launch the folder's project X in dev mode";
    echo -e "   X : back | front | db | prox";
    echo -e " ";
    echo -e "./manag_docker.sh ps : to list only containers";
    echo -e " ";
    echo -e "|----------------END INFO SCRIPT-----------------------|";
    echo -e "\e[0m";

else
    docker images ls -a
    docker container ls -a
    docker volume ls
fi