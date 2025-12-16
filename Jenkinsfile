pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        DOCKER_IMAGE = "krutagyakaneria/nodejs_cicd_workflow"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/your-username/Health_sync.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Backend') {
                    sh 'npm run build --if-present'
                }
            }
        }

        stage('Lint') {
            steps {
                dir('Backend') {
                    sh 'npm run lint || true'
                }
            }
        }

        stage('Security Audit') {
            steps {
                dir('Backend') {
                    sh '''
                      npm audit fix || true
                      npm audit --audit-level=high || true
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}", "Backend")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'render-webhook', variable: 'WEBHOOK')]) {
                    sh 'curl -X POST $WEBHOOK'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
