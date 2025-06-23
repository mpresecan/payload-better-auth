const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col h-screen">
    <div className="flex-1">{children}</div>
  </div>
)

export default Layout
