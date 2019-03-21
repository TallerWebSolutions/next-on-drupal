import MenuContainer from '~drupal/modules/menu/containers/MenuContainer'

const Page = () => (
  <nav>
    <MenuContainer name="main">
      {({ menu, loading }) => {
        if (loading) return <div>loading...</div>

        return (
          <ul>
            {menu.links.map(({ label, url: { path, routed } }) => (
              <li key={label}>
                <Link href={routed ? '/drupal' : path} as={path}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        )
      }}
    </MenuContainer>
  </nav>
)
