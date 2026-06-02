import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jenkins CI/CD Pipeline — DevOps Docs",
  description:
    "Automated build, test, and deployment pipeline using Jenkins Declarative syntax.",
};

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Stage {
  icon: string;
  name: string;
  time: string;
  status: "green" | "amber" | "blue";
}

interface EnvVar {
  key: string;
  example: string;
  type: "required" | "optional" | "secret";
}

interface Trigger {
  icon: string;
  title: string;
  desc: string;
  badge: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const STAGES: Stage[] = [
  { icon: "ti-git-pull-request", name: "Checkout",     time: "~10s",  status: "green" },
  { icon: "ti-package",          name: "Build",         time: "~2m",   status: "green" },
  { icon: "ti-test-pipe",        name: "Test",          time: "~3m",   status: "green" },
  { icon: "ti-shield-check",     name: "Code Scan",     time: "~1m",   status: "amber" },
  { icon: "ti-box",              name: "Docker Build",  time: "~1.5m", status: "green" },
  { icon: "ti-rocket",           name: "Deploy",        time: "~1m",   status: "blue"  },
];

const ENV_VARS: EnvVar[] = [
  { key: "IMAGE_NAME",             example: "myapp",                        type: "required" },
  { key: "REGISTRY",               example: "registry.example.com",         type: "required" },
  { key: "DOCKER_CREDENTIALS_ID",  example: "docker-hub-creds",             type: "secret"   },
  { key: "SLACK_WEBHOOK",          example: "https://hooks.slack.com/…",    type: "secret"   },
  { key: "SONAR_HOST_URL",         example: "http://sonarqube:9000",         type: "optional" },
  { key: "KUBECONFIG",             example: "/var/jenkins/.kube/config",     type: "optional" },
];

const TRIGGERS: Trigger[] = [
  { icon: "ti-git-commit",  title: "Code Push",       desc: "GitHub Webhook on push",               badge: "auto"   },
  { icon: "ti-git-merge",   title: "Pull Request",    desc: "PR open / synchronize event",          badge: "auto"   },
  { icon: "ti-clock",       title: "Scheduled Build", desc: "Nightly at 02:00 AM UTC — H 2 * * *", badge: "cron"   },
  { icon: "ti-hand-click",  title: "Manual Trigger",  desc: 'Jenkins UI থেকে "Build Now" বাটন',    badge: "manual" },
];

const FEATURES: Feature[] = [
  { icon: "ti-circles-relation", title: "Parallel Testing",    desc: "Unit ও integration test একসাথে চলে — সময় বাঁচায়।"            },
  { icon: "ti-container",        title: "Docker Integration",  desc: "প্রতিটি build-এ fresh Docker image তৈরি ও push হয়।"         },
  { icon: "ti-shield",           title: "Security Scan",       desc: "npm audit ও SonarQube দিয়ে vulnerability check।"             },
  { icon: "ti-filter",           title: "Branch Filter",       desc: "Deploy stage শুধু main branch-এ চলে।"                       },
  { icon: "ti-bell",             title: "Notifications",       desc: "Success ও failure উভয় ক্ষেত্রে Slack alert পাঠায়।"          },
  { icon: "ti-refresh",          title: "Rollout Status",      desc: "kubectl rollout দিয়ে deployment নিশ্চিত হয়।"                },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function StatusDot({ status }: { status: Stage["status"] }) {
  const colors: Record<Stage["status"], string> = {
    green: "#639922",
    amber: "#BA7517",
    blue:  "#378ADD",
  };
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: colors[status],
        position: "absolute",
        top: 7,
        right: 7,
        display: "block",
      }}
    />
  );
}

function TagBadge({ type }: { type: EnvVar["type"] }) {
  const styles: Record<EnvVar["type"], React.CSSProperties> = {
    required: { background: "#FAECE7", color: "#993C1D" },
    optional: { background: "#EAF3DE", color: "#3B6D11" },
    secret:   { background: "#EEEDFE", color: "#3C3489" },
  };
  return (
    <span
      style={{
        ...styles[type],
        fontSize: 10,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 100,
        fontFamily: "'IBM Plex Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        display: "inline-block",
      }}
    >
      {type}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function JenkinsPipelinePage() {
  return (
    <>
      {/* Google Fonts + Tabler Icons */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #ffffff;
          --bg-2:      #f7f7f5;
          --text-1:    #111110;
          --text-2:    #6b6b68;
          --text-3:    #a3a39f;
          --border:    rgba(0,0,0,0.10);
          --border-md: rgba(0,0,0,0.18);
          --radius-md: 8px;
          --radius-lg: 12px;
          --mono:      'IBM Plex Mono', monospace;
          --sans:      'Sora', sans-serif;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg:        #111110;
            --bg-2:      #1a1a18;
            --text-1:    #f0ede8;
            --text-2:    #9a9893;
            --text-3:    #5c5b57;
            --border:    rgba(255,255,255,0.10);
            --border-md: rgba(255,255,255,0.18);
          }
        }

        body {
          font-family: var(--sans);
          background: var(--bg-2);
          color: var(--text-1);
          min-height: 100vh;
        }

        .page-wrap {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 4rem;
        }

        /* Topbar */
        .topbar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 0.5px solid var(--border);
          flex-wrap: wrap;
        }
        .jenkins-badge {
          background: #D85A30;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          font-family: var(--mono);
        }
        .topbar-crumb {
          font-size: 13px;
          color: var(--text-2);
          font-family: var(--mono);
        }
        .topbar-sep { color: var(--border-md); }

        /* Heading */
        .page-heading {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }
        .page-sub {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 2rem;
        }

        /* Meta pills */
        .meta-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .meta-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-2);
          background: var(--bg);
          padding: 5px 12px;
          border-radius: var(--radius-md);
          border: 0.5px solid var(--border);
          font-family: var(--mono);
        }
        .meta-pill i { font-size: 14px; }

        /* Section label */
        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-3);
          margin-bottom: 1rem;
          font-family: var(--mono);
        }

        /* Stage grid */
        .stages-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .stages-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .stage-box {
          position: relative;
          background: var(--bg);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px 8px;
          text-align: center;
          transition: border-color 0.15s;
        }
        .stage-box:hover { border-color: var(--border-md); }
        .stage-icon { font-size: 18px; display: block; margin-bottom: 4px; }
        .stage-name { font-size: 11px; font-weight: 500; line-height: 1.3; }
        .stage-time { font-size: 10px; color: var(--text-3); font-family: var(--mono); margin-top: 4px; }

        /* Divider */
        .divider {
          border: none;
          border-top: 0.5px solid var(--border);
          margin: 2rem 0;
        }

        /* Section heading */
        h2.sh {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .section-body {
          font-size: 14px;
          color: var(--text-2);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        /* Code block */
        .code-wrap {
          background: var(--bg-2);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          font-family: var(--mono);
          font-size: 12px;
          line-height: 1.85;
          overflow-x: auto;
          margin-bottom: 1.5rem;
          color: var(--text-1);
        }
        .code-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-2);
          margin-bottom: 0.75rem;
        }
        .kw  { color: #534AB7; font-weight: 500; }
        .fn  { color: #D85A30; }
        .str { color: #0F6E56; }
        .cm  { color: var(--text-3); }

        /* Triggers */
        .trigger-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 1.5rem;
        }
        .trigger-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--bg);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }
        .trigger-item > i { font-size: 16px; color: var(--text-2); flex-shrink: 0; }
        .trigger-title { font-size: 13px; font-weight: 500; flex: 1; min-width: 120px; }
        .trigger-desc  { font-size: 12px; color: var(--text-2); flex: 2; min-width: 160px; }
        .small-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 100px;
          font-family: var(--mono);
          font-weight: 500;
          background: var(--bg-2);
          color: var(--text-2);
          border: 0.5px solid var(--border);
          white-space: nowrap;
        }

        /* Env table */
        .env-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          margin-bottom: 1.5rem;
        }
        .env-table th {
          text-align: left;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-3);
          font-family: var(--mono);
          padding: 6px 12px 6px 0;
          border-bottom: 0.5px solid var(--border);
        }
        .env-table td {
          padding: 8px 12px 8px 0;
          border-bottom: 0.5px solid var(--border);
          vertical-align: middle;
        }
        .env-table td:nth-child(2) {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-2);
        }
        .mono-key {
          font-family: var(--mono);
          font-size: 12px;
        }

        /* Feature cards */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-bottom: 2rem;
        }
        .feature-card {
          background: var(--bg);
          border: 0.5px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1rem;
        }
        .feature-icon { font-size: 20px; color: var(--text-2); margin-bottom: 8px; display: block; }
        .feature-title { font-size: 13px; font-weight: 500; margin-bottom: 4px; }
        .feature-desc  { font-size: 12px; color: var(--text-2); line-height: 1.6; }

        /* Notif rows */
        .notif-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--bg-2);
          border-radius: var(--radius-md);
          margin-bottom: 8px;
          font-size: 13px;
        }
        .notif-row i { font-size: 16px; flex-shrink: 0; }

        /* Footer */
        .page-footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 0.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-text {
          font-size: 12px;
          color: var(--text-3);
          font-family: var(--mono);
        }
      `}</style>

      <div className="page-wrap">

        {/* ── Topbar ─────────────────────────────────────────── */}
        <div className="topbar">
          <span className="jenkins-badge">Jenkins</span>
          <span className="topbar-crumb">docs</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-crumb">cicd-pipeline</span>
          <span className="topbar-sep">/</span>
          <span className="topbar-crumb">Jenkinsfile</span>
        </div>

        {/* ── Heading ────────────────────────────────────────── */}
        <h1 className="page-heading">Jenkins CI/CD Pipeline</h1>
        <p className="page-sub">
          Automated build, test, and deployment pipeline using Jenkins —
          source থেকে production পর্যন্ত সম্পূর্ণ workflow একটি Jenkinsfile এ সংজ্ঞায়িত।
        </p>

        {/* ── Meta pills ─────────────────────────────────────── */}
        <div className="meta-row">
          {[
            { icon: "ti-git-branch",  label: "main / develop"         },
            { icon: "ti-clock",       label: "~8 min avg"             },
            { icon: "ti-server",      label: "Jenkins 2.x LTS"        },
            { icon: "ti-file-code",   label: "Declarative Pipeline"   },
          ].map(({ icon, label }) => (
            <span key={label} className="meta-pill">
              <i className={`ti ${icon}`} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        {/* ── Pipeline Stages ────────────────────────────────── */}
        <p className="section-label">Pipeline Stages</p>
        <div className="stages-grid">
          {STAGES.map((s) => (
            <div key={s.name} className="stage-box">
              <StatusDot status={s.status} />
              <i className={`ti ${s.icon} stage-icon`} aria-hidden="true" />
              <div className="stage-name">{s.name}</div>
              <div className="stage-time">{s.time}</div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* ── Jenkinsfile ────────────────────────────────────── */}
        <h2 className="sh">Jenkinsfile</h2>
        <p className="section-body">
          Declarative syntax ব্যবহার করে লেখা পূর্ণাঙ্গ pipeline definition।
          এই ফাইলটি project root-এ রাখতে হবে।
        </p>

        <div className="code-wrap">
          <div className="code-header">
            <i className="ti ti-file-code" aria-hidden="true" />
            Jenkinsfile
          </div>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            <code
              dangerouslySetInnerHTML={{
                __html: `<span class="kw">pipeline</span> {
  <span class="kw">agent</span> any

  <span class="kw">environment</span> {
    <span class="fn">IMAGE_NAME</span> = <span class="str">'myapp'</span>
    <span class="fn">REGISTRY</span>   = <span class="str">'registry.example.com'</span>
    <span class="fn">DEPLOY_ENV</span> = <span class="str">'production'</span>
  }

  <span class="kw">stages</span> {

    <span class="kw">stage</span>(<span class="str">'Checkout'</span>) {
      <span class="kw">steps</span> {
        <span class="fn">checkout</span> scm
        <span class="fn">echo</span> <span class="str">'Source code fetched ✓'</span>
      }
    }

    <span class="kw">stage</span>(<span class="str">'Build'</span>) {
      <span class="kw">steps</span> {
        <span class="fn">sh</span> <span class="str">'npm ci'</span>
        <span class="fn">sh</span> <span class="str">'npm run build'</span>
      }
    }

    <span class="kw">stage</span>(<span class="str">'Test'</span>) {
      <span class="kw">parallel</span> {
        <span class="kw">stage</span>(<span class="str">'Unit Tests'</span>) {
          <span class="kw">steps</span> { <span class="fn">sh</span> <span class="str">'npm run test:unit'</span> }
        }
        <span class="kw">stage</span>(<span class="str">'Integration Tests'</span>) {
          <span class="kw">steps</span> { <span class="fn">sh</span> <span class="str">'npm run test:integration'</span> }
        }
      }
    }

    <span class="kw">stage</span>(<span class="str">'Code Scan'</span>) {
      <span class="kw">steps</span> {
        <span class="fn">sh</span> <span class="str">'npm audit --audit-level=high'</span>
        <span class="fn">sh</span> <span class="str">'npx sonarqube-scanner'</span>
      }
    }

    <span class="kw">stage</span>(<span class="str">'Docker Build &amp; Push'</span>) {
      <span class="kw">steps</span> {
        <span class="fn">sh</span> <span class="str">'''
          docker build -t $REGISTRY/$IMAGE_NAME:$BUILD_NUMBER .
          docker push $REGISTRY/$IMAGE_NAME:$BUILD_NUMBER
        '''</span>
      }
    }

    <span class="kw">stage</span>(<span class="str">'Deploy'</span>) {
      <span class="kw">when</span> { <span class="fn">branch</span> <span class="str">'main'</span> }
      <span class="kw">steps</span> {
        <span class="fn">sh</span> <span class="str">'''
          kubectl set image deployment/myapp \\
            myapp=$REGISTRY/$IMAGE_NAME:$BUILD_NUMBER
          kubectl rollout status deployment/myapp
        '''</span>
      }
    }

  }

  <span class="kw">post</span> {
    <span class="fn">success</span> { <span class="fn">slackSend</span> color: <span class="str">'good'</span>,   message: <span class="str">"✅ Build #$BUILD_NUMBER passed"</span> }
    <span class="fn">failure</span> { <span class="fn">slackSend</span> color: <span class="str">'danger'</span>, message: <span class="str">"❌ Build #$BUILD_NUMBER failed"</span> }
  }
}`,
              }}
            />
          </pre>
        </div>

        <hr className="divider" />

        {/* ── Triggers ───────────────────────────────────────── */}
        <h2 className="sh">Pipeline Triggers</h2>
        <p className="section-body">কোন ইভেন্টগুলো pipeline চালু করে তা নিচে দেওয়া হলো।</p>

        <div className="trigger-list">
          {TRIGGERS.map((t) => (
            <div key={t.title} className="trigger-item">
              <i className={`ti ${t.icon}`} aria-hidden="true" />
              <span className="trigger-title">{t.title}</span>
              <span className="trigger-desc">{t.desc}</span>
              <span className="small-badge">{t.badge}</span>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* ── Environment Variables ──────────────────────────── */}
        <h2 className="sh">Environment Variables</h2>
        <p className="section-body">
          Pipeline-এ ব্যবহৃত environment variable গুলো Jenkins Credentials Manager
          অথবা Jenkinsfile-এ সেট করতে হবে।
        </p>

        <table className="env-table">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Default / Example</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {ENV_VARS.map((v) => (
              <tr key={v.key}>
                <td><code className="mono-key">{v.key}</code></td>
                <td>{v.example}</td>
                <td><TagBadge type={v.type} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="divider" />

        {/* ── Features ───────────────────────────────────────── */}
        <h2 className="sh">Key Features</h2>
        <p className="section-body">এই pipeline-এ যা যা অন্তর্ভুক্ত রয়েছে।</p>

        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <i className={`ti ${f.icon} feature-icon`} aria-hidden="true" />
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* ── Notifications ──────────────────────────────────── */}
        <h2 className="sh">Post-build Notifications</h2>

        <div
          className="notif-row"
          style={{ marginBottom: 8 }}
        >
          <i className="ti ti-check" style={{ color: "#3B6D11" }} aria-hidden="true" />
          <span>
            <strong>Success</strong> — Slack-এ সবুজ বার্তা পাঠায়, build number ও branch সহ।
          </span>
        </div>
        <div className="notif-row" style={{ marginBottom: 8 }}>
          <i className="ti ti-x" style={{ color: "#A32D2D" }} aria-hidden="true" />
          <span>
            <strong>Failure</strong> — Slack-এ লাল alert, কোন stage ব্যর্থ হয়েছে তা জানায়।
          </span>
        </div>
        <div className="notif-row" style={{ marginBottom: 0 }}>
          <i className="ti ti-mail" style={{ color: "#534AB7" }} aria-hidden="true" />
          <span>
            <strong>Email (optional)</strong> —{" "}
            <code className="mono-key">emailext</code> plugin দিয়ে team-কে email পাঠানো যায়।
          </span>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="page-footer">
          <span className="footer-text">Muhammad Wasim Uddin Omar — DevOps Docs file</span>
          <span className="footer-text">Jenkins 2.x · Declarative Pipeline · v1.0</span>
        </footer>

      </div>
    </>
  );
}