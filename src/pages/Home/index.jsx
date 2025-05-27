import Presentation from "./section/presentation.jsx";
import SectionDivider from "./section/sectionProvider.jsx";
import Search from "./section/search.jsx";
import Products from "./section/products.jsx";
import Testimonials from "./section/testimonial.jsx";

export default function Home() {
    return (
        <>
            <Presentation />
            <SectionDivider />
            <Products />
            <SectionDivider />
            <Search />
            <SectionDivider />
            <Testimonials />
        </>
    )
}
