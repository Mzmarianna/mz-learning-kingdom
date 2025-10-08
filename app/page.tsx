
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-700">Mz. Marianna</div>
          <nav>
            <Link href="/quiz" className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300">
              Start Your 3-Minute Quiz
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Unlock Your Child's Genius in Weeks
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Stop the homework battles and watch your child's confidence soar. Our proven method gets results where others have failed.
        </p>
        <div className="mt-8">
          <Link href="/quiz" className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-500 transition-transform duration-300 inline-block shadow-lg transform hover:scale-105">
            Get Your Personalized Plan
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">*ESA/Scholarship Accepted*</p>
      </main>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Is This You?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">The Daily Struggle</h3>
              <p>You're tired of arguing over homework and seeing your child fall behind.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Lost Confidence</h3>
              <p>Your child feels "stupid" and has given up on trying their best in school.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Wasted Money</h3>
              <p>You've spent hundreds on tutors and programs with little to no results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-center mb-4">The Solution is Here</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            We don't just teach subjects. We rebuild your child's entire approach to learning, creating a foundation for lifelong success.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Results from Parents Like You</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-100 rounded-lg">
              <p className="italic">"My son went from hating math to solving problems for fun. I can't believe the change. His grades are up, and our evenings are finally peaceful!"
              </p>
              <p className="mt-4 font-bold">- Sarah J., Parent of an 8th Grader</p>
            </div>
            <div className="p-8 bg-gray-100 rounded-lg">
              <p className="italic">"The reading program was a game-changer. My daughter is now reading above her grade level and, for the first time, she actually enjoys it."
              </p>
              <p className="mt-4 font-bold">- Mark D., Parent of a 3rd Grader</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to See a Real Change?</h2>
          <p className="mb-8">Take our free, 3-minute quiz to get a personalized learning plan tailored to your child's exact needs.</p>
          <Link href="/quiz" className="bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-500 transition-transform duration-300 inline-block shadow-lg transform hover:scale-105">
            Start the Quiz Now!
          </Link>
          <p className="mt-8 text-sm">&copy; {new Date().getFullYear()} Mz. Marianna. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
