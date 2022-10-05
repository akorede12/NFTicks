import gsap from 'gsap'

const animations = {
    isNavBarOpen: false,
    openNav() {
        const navMobile = document.getElementById('Nav-Mobile');
        gsap.to(navMobile, { duration: .3, left: 0 })
        this.isNavBarOpen = true
    },
    closeNav() {
        const navMobile = document.getElementById('Nav-Mobile');
        gsap.to(navMobile, { duration: .5, left: '-500px' })
        this.isNavBarOpen = false
    }
}

export default animations;