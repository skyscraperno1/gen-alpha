import { HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";
import { containerVariants, characterVariants, dotVariants, plusVariants, offset } from "./animation";
import { ButtonWrapper } from "../const";
import { RxDotFilled } from "react-icons/rx";
import { cn } from "@/lib/utils";
export const ContactButton = ({ children = 'Contact' }) => {
  const characters = children.split("");
  return (
    <ButtonWrapper
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className={cn("flex items-center justify-center gap-1 w-full h-full overflow-hidden", `pl-[${offset/2}px]`)}>
        <motion.div
          variants={dotVariants}
        >
          <RxDotFilled className="text-[20px]" />
        </motion.div>
        <motion.div className="flex uppercase h-[14px] leading-[14px]">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={characterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div variants={plusVariants}>
          <HiPlus className="text-[12px]"/>
        </motion.div>
      </div>

    </ButtonWrapper>
  );
}