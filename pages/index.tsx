import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 flex flex-col space-y-5 min-h-screen">
      <div className="bg-white sm:bg-red-400 md:bg-teal-400 lg:bg-indigo-400 xl:bg-yellow-400 2xl:bg-pink-500 p-6 rounded-3xl shadow-xl">
        <span className="font-bold text-3xl">Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex justify-between my-2">
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        {['a', 'b', 'c', '', 'e'].map((c, i) => (
          <li key={i} className="bg-red-500 py-2 empty:hidden">
            {c}
          </li>
        ))}
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$38</span>
        </div>
        <button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:bg-red-500">
          Check Out
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl group">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-zinc-500 rounded-full  group-hover:bg-yellow-500 transition-colors"></div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Tony Molly</span>
            <span className="text-sm text-gray-500">미국</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <span>⬅</span>
          <div className="space-x-3">
            <span>⭐ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">❤</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-2 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
            </div>
            <div className="flex items-center space-x-5">
              <button className="bg-blue-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="bg-blue-200 rounded-lg flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-2xl">$450</span>
          <button className="bg-blue-500 text-center text-white rounded-lg py-2 px-8 text-xs">Add to cart</button>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl"> </div>
    </div>
  );
};

export default Home;

// device 크기에 따라
// sm:bg-red-400 md:bg-teal-400 lg:bg-indigo-400 xl:bg-yellow-400 2xl:bg-pink-500

// <form className="flex flex-col space-y-2 ">
// <input type="text" required placeholder="Username" className="border p-1 peer border-gray-400 rounded-lg" />
// <span className="hidden peer-invalid:block peer-invalid:text-red-500">This input is invalid</span>
// <span className="hidden peer-valid:block peer-valid:text-teal-500">Awesome Username</span>
// <span className="hidden peer-hover:block peer-valid:text-amber-500">Hello</span>
// <input type="submit" value={'Login'} className="bg-white" />
// </form>
// <details className="select-none open:text-white open:bg-indigo-400">
// <summary className="cursor-pointer">What is my fav. food.</summary>
// <div>
//   <span>김치</span>
// </div>
// </details>
// <ul className="list-decimal marker:text-teal-500">
// <li>hi</li>
// <li>hi</li>
// <li>hi</li>
// </ul>
// <input
// type="file"
// className="file:cursor-pointer file:hover:text-purple-400 file:hover:bg-white file:hover:border-purple-400 file:hover:border file:transition-colors file:border-0 file:rounded-xl file:px-5 file:text-white file:bg-purple-400"
// />
// <p className="first-letter:text-7xl">lo rem asdfasdfasdfasdfasdfasdf</p>
