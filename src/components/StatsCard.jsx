import { 
  ShieldAlert, 
  Users, 
  UserX, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Radio,
  AlertCircle
} from "lucide-react";

function StatsCard({ title, value, trend, trendDirection, colorScheme, icon }) {
  // Safe fallbacks for default parameters if they aren't explicitly passed
  const getCardMetadata = () => {
    switch (title) {
      case "Total Crimes":
        return {
          icon: ShieldAlert,
          color: "danger",
          trendText: "+8% vs last month",
          direction: "up"
        };
      case "Total Victims":
        return {
          icon: Users,
          color: "warning",
          trendText: "0% change",
          direction: "neutral"
        };
      case "Total Accused":
        return {
          icon: UserX,
          color: "info",
          trendText: "-2% decrease",
          direction: "down"
        };
      case "Active Investigations":
        return {
          icon: Radio,
          color: "warning",
          trendText: "5 active cases",
          direction: "neutral"
        };
      case "Crime Hotspots":
        return {
          icon: ShieldAlert,
          color: "danger",
          trendText: "3 critical zones",
          direction: "up"
        };
      case "High Risk Districts":
        return {
          icon: AlertCircle,
          color: "danger",
          trendText: "2 districts alert",
          direction: "up"
        };
      case "Police Stations Covered":
      case "Police Stations":
        return {
          icon: Building2,
          color: "success",
          trendText: "10 divisions",
          direction: "neutral"
        };
      default:
        return {
          icon: ShieldAlert,
          color: "info",
          trendText: "",
          direction: "neutral"
        };
    }
  };

  const metadata = getCardMetadata();
  const IconComponent = icon || metadata.icon;
  const cardColor = colorScheme || metadata.color;
  const cardTrend = trend || metadata.trendText;
  const direction = trendDirection || metadata.direction;

  const renderTrendIcon = () => {
    if (direction === "up") return <TrendingUp size={14} />;
    if (direction === "down") return <TrendingDown size={14} />;
    return <Minus size={14} />;
  };

  return (
    <div className="dashboard-card kpi-card">
      <div className="kpi-details">
        <span className="kpi-title">{title}</span>
        <span className="kpi-value">{value}</span>
        {cardTrend && (
          <div className={`kpi-trend ${direction}`}>
            {renderTrendIcon()}
            <span>{cardTrend}</span>
          </div>
        )}
      </div>
      <div className={`kpi-icon-container ${cardColor}`}>
        <IconComponent size={22} />
      </div>
    </div>
  );
}

export default StatsCard;