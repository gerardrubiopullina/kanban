import { UserMenu } from "./UserMenu";


const Header = () => (
    <header className="bg-primary shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">K</span>
                </div>
                <h1 className="text-xl font-semibold text-text-primary">Daily Tasks</h1>
            </div>

            <span></span>
            <UserMenu />
        </div>
    </header>
);
  
export default Header;