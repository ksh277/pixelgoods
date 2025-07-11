import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface SectionHeaderProps {
  emoji: string;
  title: { ko: string; en: string };
  subtitle: { ko: string; en: string };
  seeMoreLink?: string;
}

export function SectionHeader({ emoji, title, subtitle, seeMoreLink }: SectionHeaderProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-korean flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          {t(title)}
        </h2>
        <p className="text-muted-foreground text-korean text-sm md:text-base">
          {t(subtitle)}
        </p>
      </div>
      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <motion.button
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm md:text-base transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {t({ ko: "더보기", en: "See More" })}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}