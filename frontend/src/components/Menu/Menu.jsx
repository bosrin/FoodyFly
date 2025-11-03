import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

// ---------- Breakfast ----------
import AvocadoToast from "../../assest/Breakfast/AvocadoToast.png";
import Baklava from "../../assest/Breakfast/Baklava.png";
import BananaToast from "../../assest/Breakfast/BananaToast.png";
import BreakfastBurrito from "../../assest/Breakfast/BreakfastBurrito.png";
import EggsBenedict from "../../assest/Breakfast/EggsBenedict.png";
import FocacciaBread from "../../assest/Breakfast/FocacciaBread.png";
import FrenchToast from "../../assest/Breakfast/FrenchToast.png";
import Pancakes from "../../assest/Breakfast/PancakeswithMapleSyrup.png";
import SpicyBeefTacos from "../../assest/Breakfast/SpicyBeefTacos.png";

// ---------- Lunch ----------
import BeefBourguignon from "../../assest/Lunch/BeefBourguignon.png";
import ChickenCaesarSalad from "../../assest/Lunch/ChickenCaesarSalad.png";
import ChickenChargha from "../../assest/Lunch/ChickenChargha.png";
import ChickenQuesadilla from "../../assest/Lunch/ChickenQuesadilla.png";
import ChickenTikka from "../../assest/Lunch/ChickenTikka.png";
import Chilaquiles from "../../assest/Lunch/Chilaquiles.png";
import ClubSandwich from "../../assest/Lunch/ClubSandwich.png";
import Kebab from "../../assest/Lunch/Kebab.png";
import LambChops from "../../assest/Lunch/LambChops.png";
import PalakPaneer from "../../assest/Lunch/PalakPaneer.png";
import Risotto from "../../assest/Lunch/Risotto.png";
import RoastChicken from "../../assest/Lunch/RoastChicken.png";

// ---------- Dinner ----------
import ChickenParmesan from "../../assest/Dinner/ChickenParmesan.png";
import ChilesRellenos from "../../assest/Dinner/ChilesRellenos.png";
import Churros from "../../assest/Dinner/Churros.png";
import EggplantParmesan from "../../assest/Dinner/EggplantParmesan.png";
import Fajitas from "../../assest/Dinner/Fajitas.png";
import FettuccineAlferdo from "../../assest/Dinner/FettuccineAlferdo.png";
import FishTacos from "../../assest/Dinner/FishTacos.png";
import GarlicButterLambChops from "../../assest/Dinner/GarlicButterLambChops.png";
import GrilledRibeyeSteak from "../../assest/Dinner/GrilledRibeyeSteak.png";
import PozoleRojo from "../../assest/Dinner/PozoleRojo.png";
import ShrimpScampi from "../../assest/Dinner/ShrimpScampi.png";
import SunnyOats from "../../assest/Dinner/SunnyOats.png";
import SushiCombo from "../../assest/Dinner/SushiCombo.png";
import TacosalPastor from "../../assest/Dinner/TacosalPastor.png";

// ---------- Snacks ----------
import BagelSmash from "../../assest/Snack/BagelSmash.png";
import BagelwithLox from "../../assest/Snack/BagelwithLox.png";
import Burrito from "../../assest/Snack/Burrito.png";
import Cannoli from "../../assest/Snack/Cannoli.png";
import Enchiladas from "../../assest/Snack/Enchiladas.png";
import GrilledCheeseSandwich from "../../assest/Snack/GrilledCheeseSandwich.png";
import MargheritaPizzaSnack from "../../assest/Snack/MargheritaPizza.png";
import MasalaDosa from "../../assest/Snack/MasalaDosa.png";
import MexicanTacos from "../../assest/Snack/MexicanTacos.png";
import Nachos from "../../assest/Snack/Nachos.png";
import PestoPasta from "../../assest/Snack/PestoPasta.png";
import SpaghettiCarbonaraSnack from "../../assest/Snack/SpaghettiCarbonara.png";

// ---------- Pasta ----------
import Gnocchi from "../../assest/Pasta/Gnocchi.png";
import GrilledSalmonBowl from "../../assest/Pasta/GrilledSalmonBowl.png";
import ItalianPasta from "../../assest/Pasta/ItalianPasta.png";
import PannerTikka from "../../assest/Pasta/PannerTikka.png";
import PastaPrimavera from "../../assest/Pasta/PastaPrimavera.png";
import PastaSalad from "../../assest/Pasta/PastaSalad.png";
import PenneArrabbiata from "../../assest/Pasta/PenneArrabbiata.png";
import PestoPastaWithShrimp from "../../assest/Pasta/PestoPastaWithShrimp.png";
import QuinoaSalad from "../../assest/Pasta/QuinoaSalad.png";

// ---------- Drinks ----------
import Cappuccino from "../../assest/Drinks/Cappuccino.png";
import CaramelMacchiato from "../../assest/Drinks/CaramelMacchiato.png";
import ChocolateCake from "../../assest/Drinks/ChocolateCake.png";
import ChocolateMousse from "../../assest/Drinks/ChocolateMousse.png";
import Espresso from "../../assest/Drinks/Espresso.png";
import GreenTeaSmoothie from "../../assest/Drinks/GreenTeaSmoothie.png";
import IcedLatte from "../../assest/Drinks/IcedLatte.png";
import IcedTea from "../../assest/Drinks/IcedTea.png";
import Lemonade from "../../assest/Drinks/Lemonade.png";
import Margarita from "../../assest/Drinks/Margarita.png";
import MochaFrappuccino from "../../assest/Drinks/MochaFrappuccino.png";
import Mojito from "../../assest/Drinks/Mojito.png";
import SalmonFillet from "../../assest/Drinks/SalmonFillet.png";
import Smoothie from "../../assest/Drinks/Smoothie.png";
import StrawberryMilkshake from "../../assest/Drinks/StrawberryMilkshake.png";

// ---------- Desserts ----------
import Cheesecake from "../../assest/Desserts/Cheesecake.png";
import ChocolateLavaCake from "../../assest/Desserts/ChocolateLavaCake.png";
import FruitSmoothieBowl from "../../assest/Desserts/FruitSmoothieBowl.png";
import FruitWaffle from "../../assest/Desserts/FruitWaffle.png";
import Gelato from "../../assest/Desserts/Gelato.png";
import GranolaParfait from "../../assest/Desserts/GranolaParfait.png";
import GulabJamun from "../../assest/Desserts/GulabJamun.png";
import OssoBuco from "../../assest/Desserts/OssoBuco.png";
import PannaCotta from "../../assest/Desserts/PannaCotta.png";
import Pavlova from "../../assest/Desserts/Pavlova.png";
import Profiteroles from "../../assest/Desserts/Profiteroles.png";
import RicottaPie from "../../assest/Desserts/RicottaPie.png";
import StrawberryShortcake from "../../assest/Desserts/StrawberryShortcake.png";
import Tamales from "../../assest/Desserts/Tamales.png";
import TiramisuCake from "../../assest/Desserts/TiramisuCake.png";

const Menu = ({ addToCart }) => {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const navigate = useNavigate();

  const menuData = {
    Breakfast: [
      { name: "Avocado Toast", img: AvocadoToast, price: 350 },
      { name: "Baklava", img: Baklava, price: 300 },
      { name: "Banana Toast", img: BananaToast, price: 320 },
      { name: "Breakfast Burrito", img: BreakfastBurrito, price: 400 },
      { name: "Eggs Benedict", img: EggsBenedict, price: 380 },
      { name: "Focaccia Bread", img: FocacciaBread, price: 290 },
      { name: "French Toast", img: FrenchToast, price: 360 },
      { name: "Pancakes with Maple Syrup", img: Pancakes, price: 399 },
      { name: "Spicy Beef Tacos", img: SpicyBeefTacos, price: 420 },
    ],
    Lunch: [
      { name: "Beef Bourguignon", img: BeefBourguignon, price: 799 },
      { name: "Chicken Caesar Salad", img: ChickenCaesarSalad, price: 399 },
      { name: "Chicken Chargha", img: ChickenChargha, price: 650 },
      { name: "Chicken Quesadilla", img: ChickenQuesadilla, price: 550 },
      { name: "Chicken Tikka", img: ChickenTikka, price: 549 },
      { name: "Chilaquiles", img: Chilaquiles, price: 500 },
      { name: "Club Sandwich", img: ClubSandwich, price: 420 },
      { name: "Kebab", img: Kebab, price: 600 },
      { name: "Lamb Chops", img: LambChops, price: 750 },
      { name: "Palak Paneer", img: PalakPaneer, price: 450 },
      { name: "Risotto", img: Risotto, price: 520 },
      { name: "Roast Chicken", img: RoastChicken, price: 650 },
    ],
    Dinner: [
      { name: "Chicken Parmesan", img: ChickenParmesan, price: 600 },
      { name: "Chiles Rellenos", img: ChilesRellenos, price: 450 },
      { name: "Churros", img: Churros, price: 320 },
      { name: "Eggplant Parmesan", img: EggplantParmesan, price: 420 },
      { name: "Fajitas", img: Fajitas, price: 500 },
      { name: "Fettuccine Alfredo", img: FettuccineAlferdo, price: 480 },
      { name: "Fish Tacos", img: FishTacos, price: 460 },
      { name: "Garlic Butter Lamb Chops", img: GarlicButterLambChops, price: 750 },
      { name: "Grilled Ribeye Steak", img: GrilledRibeyeSteak, price: 800 },
      { name: "Pozole Rojo", img: PozoleRojo, price: 420 },
      { name: "Shrimp Scampi", img: ShrimpScampi, price: 680 },
      { name: "Sunny Oats", img: SunnyOats, price: 300 },
      { name: "Sushi Combo", img: SushiCombo, price: 700 },
      { name: "Tacos al Pastor", img: TacosalPastor, price: 480 },
    ],
        Snacks: [
      { name: "Bagel Smash", img: BagelSmash, price: 350 },
      { name: "Bagel with Lox", img: BagelwithLox, price: 400 },
      { name: "Burrito", img: Burrito, price: 300 },
      { name: "Cannoli", img: Cannoli, price: 280 },
      { name: "Enchiladas", img: Enchiladas, price: 450 },
      { name: "Grilled Cheese Sandwich", img: GrilledCheeseSandwich, price: 320 },
      { name: "Margherita Pizza", img: MargheritaPizzaSnack, price: 500 },
      { name: "Masala Dosa", img: MasalaDosa, price: 350 },
      { name: "Mexican Tacos", img: MexicanTacos, price: 400 },
      { name: "Nachos", img: Nachos, price: 300 },
      { name: "Pesto Pasta", img: PestoPasta, price: 480 },
      { name: "Spaghetti Carbonara", img: SpaghettiCarbonaraSnack, price: 520 },
    ],
    Pasta: [
      { name: "Gnocchi", img: Gnocchi, price: 480 },
      { name: "Grilled Salmon Bowl", img: GrilledSalmonBowl, price: 700 },
      { name: "Italian Pasta", img: ItalianPasta, price: 520 },
      { name: "Panner Tikka", img: PannerTikka, price: 450 },
      { name: "Pasta Primavera", img: PastaPrimavera, price: 500 },
      { name: "Pasta Salad", img: PastaSalad, price: 420 },
      { name: "Penne Arrabbiata", img: PenneArrabbiata, price: 480 },
      { name: "Pesto Pasta with Shrimp", img: PestoPastaWithShrimp, price: 550 },
      { name: "Quinoa Salad", img: QuinoaSalad, price: 400 },
    ],
    Drinks: [
      { name: "Cappuccino", img: Cappuccino, price: 220 },
      { name: "Caramel Macchiato", img: CaramelMacchiato, price: 250 },
      { name: "Chocolate Cake Drink", img: ChocolateCake, price: 300 },
      { name: "Chocolate Mousse Drink", img: ChocolateMousse, price: 320 },
      { name: "Espresso", img: Espresso, price: 200 },
      { name: "Green Tea Smoothie", img: GreenTeaSmoothie, price: 280 },
      { name: "Iced Latte", img: IcedLatte, price: 240 },
      { name: "Iced Tea", img: IcedTea, price: 180 },
      { name: "Lemonade", img: Lemonade, price: 200 },
      { name: "Margarita", img: Margarita, price: 350 },
      { name: "Mocha Frappuccino", img: MochaFrappuccino, price: 280 },
      { name: "Mojito", img: Mojito, price: 350 },
      { name: "Salmon Fillet Drink", img: SalmonFillet, price: 400 },
      { name: "Smoothie", img: Smoothie, price: 300 },
      { name: "Strawberry Milkshake", img: StrawberryMilkshake, price: 270 },
    ],
    Desserts: [
      { name: "Cheesecake", img: Cheesecake, price: 420 },
      { name: "Chocolate Lava Cake", img: ChocolateLavaCake, price: 450 },
      { name: "Fruit Smoothie Bowl", img: FruitSmoothieBowl, price: 380 },
      { name: "Fruit Waffle", img: FruitWaffle, price: 400 },
      { name: "Gelato", img: Gelato, price: 320 },
      { name: "Granola Parfait", img: GranolaParfait, price: 360 },
      { name: "Gulab Jamun", img: GulabJamun, price: 300 },
      { name: "Osso Buco", img: OssoBuco, price: 550 },
      { name: "Panna Cotta", img: PannaCotta, price: 420 },
      { name: "Pavlova", img: Pavlova, price: 430 },
      { name: "Profiteroles", img: Profiteroles, price: 440 },
      { name: "Ricotta Pie", img: RicottaPie, price: 400 },
      { name: "Strawberry Shortcake", img: StrawberryShortcake, price: 420 },
      { name: "Tamales", img: Tamales, price: 390 },
      { name: "Tiramisu Cake", img: TiramisuCake, price: 450 },
    ],

  };

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <>
      <section id="menu" className="menu-showcase">
        <h2 className="menu-section-title">Our Signature Menu</h2>
        <p className="menu-section-sub">
          A refined selection celebrating world flavors with a local touch.
        </p>

        <div className="menu-tabs">
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              className={`menu-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {menuData[activeTab].map((item, index) => (
            <div className="menu-card" key={index}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Culinary delight for every mood.</p>
              <div className="price-add">
                <span>৳{item.price}</span>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <button className="explore-btn">Explore Full Menu</button>
      </section>

      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-about">
            <h3>FoodyFly</h3>
            <p>
              Where culinary artistry meets modern lifestyle. Experience handcrafted
              dishes made with care, right here in Bangladesh.
            </p>
            <div className="subscribe">
              <input type="email" placeholder="Enter your email" />
              <button>Join Now</button>
            </div>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Menu</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          © 2025 FoodyFly. All rights reserved. | Designed by Bosrin
        </p>
      </footer>
    </>
  );
};

export default Menu;
