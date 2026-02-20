pipeline {
//    agent {
//        docker {
//            image 'node:24-alpine'
//        }
//    }

    agent any

    environment {
        DB_HOST = '127.0.0.1'
        DB_USER = 'db_user'
        DB_PASSWORD = 'db_password'
        DB_NAME = 'db_name'
    }

    stages {
        stage("Build container") {
            steps {
                sh 'docker --version'
                sh 'docker images rm -f my-node-app || true'
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Stop existing container') {
            steps {
            //     On utilise "|| true" pour éviter que le pipeline échoue si le conteneur n'existe pas ou est déjà arrêté
                sh 'docker stop my-node-app || true'
                sh 'docker rm my-node-app || true'
            }
        }

        stage('Run container') {
            steps {
                sh '''
                    docker run -d --name my-node-app \
                    -p 3000:3000 \
                    -e DB_HOST=${DB_HOST} \
                    -e DB_USER=${DB_USER} \
                    -e DB_PASSWORD=${DB_PASSWORD} \
                    -e DB_NAME=${DB_NAME} \
                    my-node-app
                '''
            }
       }

//        stage("Install dependencies") {
//            steps {
//                sh 'node --version'
//                sh 'npm --version'
//                sh 'npm install'
//            }
//        }

//      Attention à ne pas faire ceci, car comme constaté
//      jenkins attends que le processus se termine, et comme npm start est un processus qui tourne en continu,
//      le pipeline ne se terminera jamais
//        stage("Start application") {
//            steps {
//                sh 'npm start'
//            }
//        }
    }
}