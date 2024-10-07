
export default function Home() {
  return (
    <>
      <nav className="p bg-blue-200">
        <ul>
          <li>Shop</li>
          <li>Latest products</li>
          <li>Stores</li>
        </ul>
        <div></div>
      </nav>
      <div className="flex p bg-yellow-200 h-p1000 w-p550">
        * Here we will have all the products *
        <div>
          * Here we will display product filters *
        </div>
      </div>      
      <footer className="p bg-blue-500">
        WDD 430 - Group 02 Project
      </footer>
    </>
  );
}