## CI/CD Pipeline

#### ekta project create koro--->github e push koro
#### Jenkins er New Item click koro--->Enter an item name: nextjs-pipeline --->select: Pipeline --->click: OK
#### Triggers er select koro: GitHub hook trigger for GITScm polling ? --->Pipeline e select koro: Pipeline script from SCM --->SCM e select koro: Git --->Repository URL e repository paste koro--->Branch Specifier (blank for 'any') e main branch daw: */main --->Script Path ? e diba: Jenkinsfile [eta auto thakbe]--->click: Save
#### project er root directory te Jenkinsfile name er file create koro [nam Jenkinsfile etai hote hobe]--->
```bash
pipeline{
    agent any

    environment{
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages{
        stage('Install'){
            steps{
                bat 'npm install'
            }
        }
        stage('Build'){
            steps{
                bat 'npm run build'
            }
        }
        stage('Test'){
            steps{
                echo 'Skipping tests - no test script found'
            }
        }
        stage('Deploy'){
            steps{
                bat 'npx vercel --prod --yes --token=%VERCEL_TOKEN%'
            }
        }
    }
}
```
---

#### github e push kore dite hobe
#### https://vercel.com/account/settings/tokens ei path e ekta token create koro--->TOKEN NAME: Jenkins Token --->SCOPE: Full Account --->EXPIRATION: 7 Days --->click: Create --->copy: token
#### project folder theke terminal open koro--->commmand daw: npm i -g vercel --->command daw: vercel login --->command daw: vercel --token [your secret token] --->
![](https://imgur.com/KaKzjTJ.png)
