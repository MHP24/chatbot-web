import { TextMessage } from '.'

export const MessagesContainer = () => {
  return (
    <ul
      className="border-2 border-red-500 flex flex-col gap-4 w-full h-full m-auto overflow-auto p-4"
    >
      <TextMessage/>
    </ul>
  )
}
