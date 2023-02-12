pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t mongmang/nest-hello-word:latest .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Dockerhub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                sh 'docker push mongmang/nest-hello-word:latest'
            }
      }
        }
        stage('Notice') {
            steps {
                echo 'Notice..'
            }
        }
    }
}
