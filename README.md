# 🚀 CI/CD Pipeline — Next.js + Jenkins + Vercel + GitHub

একটি Next.js প্রজেক্টকে GitHub push-এর মাধ্যমে স্বয়ংক্রিয়ভাবে Vercel-এ deploy করার সম্পূর্ণ গাইড।

---

## 📋 সংক্ষিপ্ত ওভারভিউ

```
GitHub Push → Jenkins Build Trigger → Install → Build → Deploy to Vercel
```

---

## ধাপ ১ — প্রজেক্ট তৈরি ও GitHub-এ Push

1. একটি Next.js প্রজেক্ট তৈরি করুন
2. GitHub-এ নতুন repository তৈরি করুন
3. প্রজেক্টটি GitHub-এ push করুন

---

## ধাপ ২ — Jenkins-এ Pipeline তৈরি

1. Jenkins খুলুন → **New Item** ক্লিক করুন
2. **Item Name:** `nextjs-pipeline`
3. **Type:** `Pipeline` সিলেক্ট করুন
4. **OK** ক্লিক করুন

### কনফিগারেশন সেটিংস:

| সেটিং | মান |
|---|---|
| **Build Trigger** | GitHub hook trigger for GITScm polling |
| **Pipeline Definition** | Pipeline script from SCM |
| **SCM** | Git |
| **Repository URL** | আপনার GitHub repo URL |
| **Branch Specifier** | `*/main` |
| **Script Path** | `Jenkinsfile` |

5. **Save** ক্লিক করুন

---

## ধাপ ৩ — Jenkinsfile তৈরি

প্রজেক্টের **root directory**-তে `Jenkinsfile` নামে একটি ফাইল তৈরি করুন (নাম ঠিক `Jenkinsfile` হতে হবে, কোনো extension নেই):

```groovy
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

> ⚠️ **Windows Server হলে** `bat` ব্যবহার করুন। Linux/Mac হলে `bat`-এর জায়গায় `sh` লিখুন।

6. ফাইলটি GitHub-এ push করুন

---

## ধাপ ৪ — Vercel Token তৈরি

1. **URL:** [https://vercel.com/account/settings/tokens](https://vercel.com/account/settings/tokens)
2. নিচের তথ্য দিয়ে token তৈরি করুন:

| ফিল্ড | মান |
|---|---|
| **Token Name** | Jenkins Token |
| **Scope** | Full Account |
| **Expiration** | 7 Days |

3. **Create** ক্লিক করুন
4. Token টি **কপি করে রাখুন** — একবারই দেখাবে!

---

## ধাপ ৫ — Vercel CLI দিয়ে প্রজেক্ট লিঙ্ক

প্রজেক্ট ফোল্ডার থেকে Terminal খুলুন এবং পর্যায়ক্রমে কমান্ড দিন:

```bash
# Vercel CLI ইনস্টল
npm i -g vercel

# Vercel-এ লগইন
vercel login

# প্রজেক্ট লিঙ্ক করুন (token দিয়ে)
vercel --token [your-secret-token]
```

কমান্ড দিলে প্রজেক্ট সেটআপের জন্য কিছু প্রশ্ন আসবে, সেগুলো follow করুন।

---

## ধাপ ৬ — Jenkins-এ Vercel Token সংরক্ষণ

1. Jenkins → **Manage Jenkins** → **Credentials**
2. **Add Credentials** ক্লিক করুন
3. নিচের তথ্য দিন:

| ফিল্ড | মান |
|---|---|
| **Kind** | Secret text |
| **Secret** | আপনার Vercel Token পেস্ট করুন |
| **ID** | `vercel_token` (Jenkinsfile-এর নামের সাথে মিলতে হবে) |

4. **Create** ক্লিক করুন

---

## ধাপ ৭ — ngrok দিয়ে Tunnel তৈরি

> GitHub থেকে Jenkins-এ webhook পাঠাতে Jenkins-কে public URL দিতে হবে।

**ngrok ডাউনলোড:** [Jenkins-Github Integration Guide](https://github.com/Omarmdwasimuddin/Jenkins-Github-Integration#%E0%A6%A7%E0%A6%BE%E0%A6%AA-%E0%A7%AB--ngrok-%E0%A6%A6%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A7%87-tunnel-%E0%A6%A4%E0%A7%88%E0%A6%B0%E0%A6%BF-%E0%A6%95%E0%A6%B0%E0%A6%BE)

1. ngrok ফাইল **double click** করুন (বা terminal-এ চালু করুন)
2. পর্যায়ক্রমে কমান্ড দিন:

```bash
# Auth token সেট করুন
ngrok config add-authtoken $YOUR_AUTHTOKEN

# Jenkins port (8080) forward করুন
ngrok http 8080
```

3. ngrok একটি public URL দেবে, যেমন: `https://abc123.ngrok.io`

---

## ধাপ ৮ — GitHub Webhook সেটআপ

1. GitHub-এ প্রজেক্টের **Settings** → **Webhooks** → **Add webhook**
2. নিচের তথ্য পূরণ করুন:

| ফিল্ড | মান |
|---|---|
| **Payload URL** | `https://your-ngrok-url/github-webhook/` |
| **Content type** | `application/json` |

3. **Update webhook** (বা Add webhook) ক্লিক করুন

---

## ✅ চূড়ান্ত পরীক্ষা

প্রজেক্টে যেকোনো পরিবর্তন করুন এবং GitHub-এ push দিন:

```bash
git add .
git commit -m "test: trigger jenkins build"
git push origin main
```

**এরপর Jenkins স্বয়ংক্রিয়ভাবে:**

```
✅ Install   →   ✅ Build   →   ✅ Test   →   ✅ Deploy
```

Build সফল হলে প্রজেক্ট Vercel-এ live হয়ে যাবে! 🎉

---

## 🔄 পুরো Pipeline-এর ফ্লো

```
Developer
   ↓ git push
GitHub Repository
   ↓ webhook (ngrok tunnel)
Jenkins Server
   ↓ Jenkinsfile execute
   ├── npm install
   ├── npm run build
   ├── (tests)
   └── vercel --prod deploy
         ↓
   Vercel (Production)
```

---

> 💡 **মনে রাখুন:** ngrok session বন্ধ হলে নতুন URL আসবে — তখন GitHub Webhook-এ আবার নতুন URL আপডেট করতে হবে। Production-এ permanent domain ব্যবহার করুন।
