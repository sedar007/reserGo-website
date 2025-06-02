import Presentation from "./section/presentation.jsx";
import SectionDivider from "./section/sectionProvider.jsx";
import Search from "../../components/layouts/search.jsx";
import Products from "./section/products.jsx";
import Testimonials from "./section/testimonial.jsx";

export default function Home() {
    return (
        <>
            <Presentation />
            <Products />
            <Search />
            <SectionDivider />
            <Testimonials />
        </>
    )
}
