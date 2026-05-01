pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

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

        stage('Pipeline Complete') {
            steps {
                echo 'CI Pipeline executed successfully!'
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