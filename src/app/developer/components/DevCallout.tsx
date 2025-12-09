type DevCalloutProps = {
  type: "info" | "warning" | "success";
  text: string;
};

export function DevCallout({ type, text }: DevCalloutProps) {
  const styles = {
    info: {
      borderColor: "border-blue-400",
      bgColor: "bg-blue-50",
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      borderColor: "border-yellow-400",
      bgColor: "bg-yellow-50",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    success: {
      borderColor: "border-green-400",
      bgColor: "bg-green-50",
      icon: (
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-4 p-4 ${style.bgColor} border-l-4 ${style.borderColor} rounded-r flex items-start gap-3`}
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <p className="text-sm text-neutral-800">{text}</p>
    </div>
  );
}

