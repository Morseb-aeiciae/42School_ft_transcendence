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
            if [ "$3" == "dev" ]  ; then
                docker compose -f docker-compose.dev.yml run backend
            else
                docker compose -f docker-compose.prod.yml run -p80:80 backend
            fi;;
        "front")
            if [ "$3" == "dev" ]  ; then
                docker compose -f docker-compose.dev.yml run frontend
            else
                docker compose -f docker-compose.prod.yml run -p80:80 frontend
            fi;;
        "db")
            if [ "$3" == "dev" ]  ; then
                docker compose -f docker-compose.dev.yml run db
            else
                docker compose -f docker-compose.prod.yml run -p80:80 db
            fi;;
        "proxy")
            if [ "$3" == "dev" ]  ; then
                docker compose -f docker-compose.dev.yml run reverse-proxy
            else
                docker compose -f docker-compose.prod.yml run -p80:80 reverse-proxy
            fi;;
    esac

elif [ "$1" == "clear" ] ; then
    docker system prune -af
    docker volume prune -f
    # rm -rf ./src/api/node_modules/
    # rm -rf ./src/client/node_modules/

elif [ "$1" == "ps" ] ; then
    docker compose -f docker-compose.dev.yml ps

elif [ "$1" == "info" ] ; then
    echo -e "\e[36m";
    echo -e "|--------------------INFO SCRIPT-----------------------|";
    echo -e "./manag_docker.sh \t\t to ls docker images and docker containers";
    echo -e " ";
    echo -e "./manag_docker.sh clear \t to delete all docker images, docker containers, docker volumes and dev folders for projects";
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