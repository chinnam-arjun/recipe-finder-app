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
post{
  finally{
    sh 'echo succeeded'
  }
}
}
