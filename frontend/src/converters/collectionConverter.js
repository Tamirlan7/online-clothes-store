import {collections} from "../data/collections";

const collectionConverter = {
    convertToShorthand(longhand) {
        for (let key in collections) {
            if (collections[key] === longhand) {
                return key
            }
        }
    },
    convertToLonghand(shorthand) {
        return collections[shorthand]
    }
}

export default collectionConverter