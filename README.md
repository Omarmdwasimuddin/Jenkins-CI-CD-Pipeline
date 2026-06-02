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
vcp_2O8qm71UTDVasbrMMWaVrc0VSnMEcHhYJeXVqQZhEYWmBzQytV0RqTfD
#### project folder theke terminal open koro--->commmand daw: npm i -g vercel --->command daw: vercel login --->command daw: vercel --token [your secret token] --->
![](https://imgur.com/KaKzjTJ.png)
#### Jenkins--->click: Manage Jenkins--->click: Credentials --->click: Add Credentials --->select: Secret text--->click: Next--->Secret: [paste your token]--->ID: [Jenkinsfile er token exm: vercel_token]--->click: Create 
#### [ngrok](https://github.com/Omarmdwasimuddin/Jenkins-Github-Integration#%E0%A6%A7%E0%A6%BE%E0%A6%AA-%E0%A7%AB--ngrok-%E0%A6%A6%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A7%87-tunnel-%E0%A6%A4%E0%A7%88%E0%A6%B0%E0%A6%BF-%E0%A6%95%E0%A6%B0%E0%A6%BE) e click kore download korar process dekhun
#### ngrok file double click koro--->command daw: ngrok config add-authtoken $YOUR_AUTHTOKEN --->command daw: ngrok http 8080
