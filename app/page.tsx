export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">⚙️ CMMS Factory</h1>
        <p className="text-2xl text-blue-100 mb-8">Maintenance Management System</p>
        <a href="/auth/signin" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
          Get Started →
        </a>
      </div>
    </div>
  );
}
