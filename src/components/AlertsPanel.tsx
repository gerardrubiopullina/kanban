import { Notifications, NotificationsOff } from "@mui/icons-material";


const AlertsPanel = () => {
    
    return (
        <div className="h-full border-l border-primary/30 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Notifications className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-text-primary">Alerts</h2>
            </div>
        
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center px-6">
                <div className="bg-primary/20 rounded-full p-4 mb-4">
                    <NotificationsOff className="h-8 w-8 text-text-secondary/50" />
                </div>
                <h3 className="text-text-primary font-medium mb-2">No alerts yet</h3>
                <p className="text-text-secondary text-sm">
                    Important notifications will appear here
                </p>
            </div>
        </div>
    );
};

export default AlertsPanel;