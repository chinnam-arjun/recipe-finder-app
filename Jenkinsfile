pipeline{
  agent {
    label 'linux'
  }
  stages{
    stage('checkout'){
      steps { checkout scm }
    }
    stage('ci'){
      steps { sh 'npm ci' }
    }
    stage('lint'){
      steps { sh 'npm run lint' }
    }
    stage('build'){
      steps { sh 'echo building',
      sh 'echo Built!' }      
    }
    stage('Archive') {
        steps {
            archiveArtifacts artifacts: 'dist/**',
            fingerprint: true
        }
    }
  }
  post {
        always {
            echo 'This will ALWAYS run, even if the build fails or aborts!'
            cleanWs() // Example: clean up the workspace
        }
        success {
            echo 'This only runs if the build succeeds.'
        }
        failure {
            echo 'This only runs if the build fails.'
        }
    }

}
