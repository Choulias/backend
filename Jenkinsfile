pipeline {
    agent any

    environment {
        SSH_SERVER = creditals('ssh-server')
        SSH_KEY_CREDENTIALS_ID = 'prod-server-key'
        DEPLOY_PATH = creditals('deployment-prod')
    }

    stages {
        stage("Build container") {
            steps {
                // !!!! Attention !!!! : Assurez-vous que :
                // 1. Docker est installé et configuré sur votre machine Jenkins.
                // 2. Votre Jenkins a les permissions nécessaires pour exécuter des commandes Docker.
                sh 'docker --version'
                // On utilise "|| true" pour éviter que le pipeline échoue si le conteneur n'existe pas ou est déjà arrêté
                sh 'docker compose -f /opt/deployment/local/docker-compose.yml stop back || true'
                // On supprime l'image existante pour éviter les conflits.
                sh 'docker image rm -f my-node-app || true'
                sh 'docker build -t my-node-app .'
                // Exporter l'image
                sh 'docker save my-node-app -o ./my-node-app.tar'
            }
        }

        stage('Deploy SSH') {
            steps {
               sshagent([env.SSH_KEY_CREDENTIALS_ID]) {
                    sh '''
                        scp ./my-node-app.tar $SSH_SERVER:$DEPLOY_PATH/
                        ssh $SSH_SERVER "
                            cd $DEPLOY_PATH
                            docker load -i my-node-app.tar
                            docker compose stop back || true
                            docker compose rm back || true
                            docker compose up back -d
                        "
                    '''
               }
            }
        }

//         stage('Stop existing container') {
//             steps {
//                 // On supprime le container existant pour éviter les conflits.
//                 sh 'docker compose -f /opt/deployment/local/docker-compose.yml rm back || true'
//             }
//         }
//
//         stage('Run container') {
//             steps {
//                 sh 'docker compose -f /opt/deployment/local/docker-compose.yml up  back -d'
//             }
//        }
    }
}