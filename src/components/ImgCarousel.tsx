import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Card, CardContent } from "@/components/ui/card"
  
  export default function ImgCarousel() {
    // <span className="text-4xl font-semibold">{index + 1}</span>  
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                <CarouselItem key='0'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="palestine0.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key='1'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="palestine1.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key='2'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="group.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key='3'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="palestine2.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key='4'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="palestine3.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem key='5'>
                    <div className="p-1">
                        <Card>
                            <CardContent className="basis-full flex aspect-square items-center justify-center p-2">
                                <img src="founders.jpg" />
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
  }