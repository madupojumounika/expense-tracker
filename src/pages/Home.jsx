import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-[#0b1220] transition-colors duration-300">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight
                           text-slate-900 dark:text-white">
              Manage your expenses <br />
              <span className="text-blue-600">with clarity & control</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-gray-400 max-w-xl">
              A simple, elegant expense tracker designed to help you
              monitor spending, stay organized, and make better
              financial decisions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl blur-3xl
                            bg-gradient-to-r from-blue-300/30 to-indigo-300/30
                            dark:from-blue-600/20 dark:to-purple-600/20" />
            <div className="relative bg-white dark:bg-[#111827]
                            border border-slate-200 dark:border-white/10
                            rounded-3xl p-8 shadow-xl">
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Monthly Overview
              </p>
              <h3 className="text-2xl font-semibold mt-2 text-slate-900 dark:text-white">
                ₹ 12,450 spent
              </h3>
              <div className="mt-6 h-3 w-full bg-slate-100 dark:bg-white/10 rounded-full">
                <div className="h-3 w-[65%] bg-blue-600 rounded-full transition-all" />
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="bg-white dark:bg-[#0f172a] py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center
                         text-slate-900 dark:text-white">
            Why use Expense Tracker?
          </h2>

          <div className="grid md:grid-cols-4 gap-10 mt-16">
            {[
              {
                icon: CurrencyRupeeIcon,
                title: "Track Spending",
                desc: "Log every expense and understand where your money goes.",
              },
              {
                icon: ChartBarIcon,
                title: "Clear Insights",
                desc: "View totals and trends with clean summaries.",
              },
              {
                icon: ClockIcon,
                title: "Save Time",
                desc: "Quick entries without complicated steps.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Private & Secure",
                desc: "All data stays safely in your browser.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl
                           bg-gray-50 dark:bg-[#0b1220]
                           border border-slate-200 dark:border-white/10
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl"
              >
                <item.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {[
              "Create your account",
              "Add daily expenses",
              "Review and improve spending",
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-[#111827]
                           border border-slate-200 dark:border-white/10
                           transition hover:shadow-lg"
              >
                <span className="text-blue-600 font-semibold text-sm">
                  STEP {i + 1}
                </span>
                <h3 className="mt-3 text-lg font-medium
                               text-slate-900 dark:text-white">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10
                         py-10 bg-white dark:bg-[#0b1220]">
        <div className="max-w-7xl mx-auto px-6
                        flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            © 2026 ExpenseTracker. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-400">
            Built for learning UI & frontend excellence
          </p>
        </div>
      </footer>

    </div>
  );
}
