import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";


export default function HomePage() {
  return (
   

    <main className="flex min-h-screen items-center justify-center p-4">
      
      <Card className="w-full max-w-md text-center space-y-2">
  
        <CardHeader>
          <div className="flex justify-between">
          <CardTitle className="text-3xl font-serif">
            Todo App
          </CardTitle>
          
          <ModeToggle />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Organize your tasks and work better.
          </p>

          <Link href="/login">
            <Button className="w-full mb-4">Login</Button>
          </Link>

          <Link href="/signup" >
            <Button variant="outline" className="w-full bg-cyan-500">
              Sign Up
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
