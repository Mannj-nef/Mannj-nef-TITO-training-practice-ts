interface ILinks {
  id: number;
  title: string;
  href: string;
}

const links: ILinks[] = [
  {
    id: 1,
    title: "Home",
    href: "#",
  },
  {
    id: 2,
    title: "FAQs",
    href: "#",
  },
  {
    id: 3,
    title: "About Us",
    href: "#",
  },
  {
    id: 4,
    title: "Contacs Us",
    href: "#",
  },
];

function Header() {
  return `
    <header class="header">
    <h1 class="header-title">YNDER TODO</h1>
    <ul class="nav-list">
    ${links
      .map(
        (item) => `<li class="nav-item">
        <a href=${item.href} class="nav-link">
          ${item.title}
        </a>
      </li>`
      )
      .join("")}
      
    </ul>
    <div>
      <button class="btn header-btn header-logout">LogOut</button>
    </div>
  </header>
    `;
}

export default Header;
