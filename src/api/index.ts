import axios from "axios";

export const searchTitles = async (searchValue: string) => {
  try {
    const { data: responce } = await axios.get(
      `https://api.anilibria.tv/v2/searchTitles?search=${searchValue}&limit=12&filter=id,names,code`
    )
    return responce
  } catch (e) {
    console.log(e.message)
  }
}