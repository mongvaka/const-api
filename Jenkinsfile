pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t mongmang/const-api:latest .'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                sh 'docker push mongmang/const-api:latest'
                    }
                }
        }
        stage('Deploy') {
            when{
                branch 'master'
            }
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'sshDeploy', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                        def remote = [:]
                        remote.name = "const-api"
                        remote.host = "203.159.93.42"
                        // remote.port = 22
                        remote.allowAnyHosts = true
                        remote.user = userName
                        remote.identityFile = identity

                        sshCommand remote: remote, command: "docker pull mongmang/const-api:latest"
                        sshCommand remote: remote, command: "docker compose stop"
                        sshCommand remote: remote, command: "docker compose up"
                    }
                }
            }
        }
    }
}
