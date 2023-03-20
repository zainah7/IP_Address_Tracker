import arrow from "./images/icon-arrow.svg"
import background from "./images/pattern-bg-desktop.png"
//https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_QJn9cjiNJdsmoDMPk83wQwC8ymMqG&ipAddress=8.8.8.8


function App() {
  return (
    <>
      <section>
        <div className="absolute -z-10">
          <img src={background} alt="" className="w-full h-80 object-cover" />
        </div>

        <article className="p-8">
          <h1 className="text-2xl text-center text-white
          font-bold mb-8"
          >IP Address Tracker</h1>

          <form className="flex justify-center max-w-4xl mx-auto">
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder=" Search for any IP Address or domain"
              required
              className="py-2 px-4 rounded-l-lg"
            />
            <button type="submit" className="bg-black py-4 px-4 hover:opacity-60 rounded-r-lg" >
              <img src={arrow} alt=""/>
            </button>
          </form>
        </article>
      </section>
    </>
  );
}

export default App;
