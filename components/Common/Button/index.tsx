import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import classNames from "classnames";
import { LuLoader2 } from "react-icons/lu";
import { dmSans } from "@/lib/utils/fonts";

type Props = {
  size?: "small" | "medium" | "large" | "extra-small";
  variant?: "filled" | "outline" | "black" | "destructive" | "success";
  className?: string;
  rounded?: "full" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  icon?: JSX.Element;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: FC<Props> = (props) => {
  const {
    onClick,
    icon,
    className: extraClass = "",
    variant = "filled",
    size = "small",
    disabled = false,
    loading = false,
    iconPosition = "right",
    rounded = "lg",
    fullWidth = false,
    children,
    ...rest
  } = props;
  let mainClass = `font-semibold duration-300 ${
    fullWidth ? "w-full flex items-center justify-center gap-3" : "w-auto flex items-center gap-2"
  } disabled:opacity-40 disabled:cursor-not-allowed ${dmSans.className} `;

  switch (variant) {
    case "filled":
      mainClass += "bg-green text-black hover:bg-green/80 ";
      break;
    case "outline":
      mainClass +=
        "bg-transparent border border-zinc-500/50 hover:border-green text-green disabled:border-zinc-500/50 ";
      break;
    case "destructive":
      mainClass +=
        "bg-transparent border border-red-500/50 hover:border-red-500 hover:bg-red-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-red-500 text-red-500 disabled:border-red-500/50 ";
      break;
    case "success":
      mainClass +=
        "bg-transparent border border-green-500/50 hover:border-green-500 hover:bg-green-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-green-500 text-green-500 disabled:border-green-500/50 ";
      break;
    case "black":
      mainClass += "hover:bg-primary-800/80 bg-primary-800 text-green ";
      break;
    default:
      break;
  }

  switch (size) {
    case "extra-small":
      mainClass += "px-4 py-[6px] text-xs ";
      break;
    case "small":
      mainClass += "px-6 py-[8px] text-sm ";
      break;
    case "medium":
      mainClass += "px-6 py-3 ";
      break;
    case "large":
      mainClass += "px-8 py-[14px] ";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${classNames([mainClass, extraClass, `rounded-${rounded}`])} `}
      disabled={disabled || loading}
      {...rest}
    >
      {iconPosition === "left" && (
        <>
          {loading ? (
            <div className="flex-shrink-0">
              <LuLoader2 size={12} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </>
      )}

      <span className="flex-shrink-0">{!loading ? children : "Loading..."}</span>

      {iconPosition === "right" && (
        <>
          {loading ? (
            <div className="flex-shrink-0">
              <LuLoader2 size={12} className="animate-spin" />
            </div>
          ) : (
            icon
          )}
        </>
      )}
    </button>
  );
};

export default Button;
