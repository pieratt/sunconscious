import { Text } from "@/ui/common/Typography";

interface Props {
  children: React.ReactNode;
}

export default function FilterHeader({ children }: Props) {
  return (
    <div>
      <Text className="text-white" variant="sans">
        {children}
      </Text>
    </div>
  );
}
