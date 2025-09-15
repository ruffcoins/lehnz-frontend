// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import { ONBOARDING_CREATORS } from "@/lib/consts"
// import { useIsMobile } from "@/hooks/useMobile"

// export function CreatorsYouMightLikeDialog() {
//     const isMobile = useIsMobile()
//   const [selectedInterests, setSelectedInterests] = useState<string[]>([])

//   const toggleInterest = (interest: string) => {
//     setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="w-fit cursor-pointer">
//           Creators You Might Like
//         </Button>
//       </DialogTrigger>
//       <DialogContent showCloseButton={isMobile} className="sm:max-w-[600px] sm:max-h-[60vh] h-[100vh] overflow-hidden flex flex-col">
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-semibold">Creators You Might Like</DialogTitle>
//           <DialogDescription className="text-center">
//             These are creators you might like based on your interests.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex-1 overflow-y-auto">
//           <div className="flex flex-wrap gap-2">
//             {ONBOARDING_CREATORS.map((creator) => (
//                     <Badge
//                       key={creator}
//                       variant={selectedInterests.includes(creator) ? "default" : "outline"}
//                       className={cn(
//                         "h-10 px-4 cursor-pointer transition-all duration-200 hover:scale-105",
//                         selectedInterests.includes(creator)
//                           ? "bg-primary text-primary-foreground shadow-md"
//                           : "hover:bg-accent hover:text-accent-foreground"
//                       )}
//                       onClick={() => toggleInterest(creator)}
//                     >
//                       {creator}
//                     </Badge>
//             ))}
//           </div>
//         </div>

//         <DialogFooter>
//             <Button
//                 type="submit"
//                 disabled={selectedInterests.length === 0}
//                 className="w-full mt-10 cursor-pointer"
//             >
//                 Continue
//             </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

export {};
