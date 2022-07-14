import { Dialog } from '@headlessui/react'
import './Dialog.css'
import Button from '../Button/Button'

interface CustomDialogProps {
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  handleOk: () => void
  handleCancel: () => void
}

const CustomDialog = ({ isOpen, setIsOpen, handleOk, handleCancel }: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog">
      <div className="backdrop" aria-hidden="true" />
      <Dialog.Panel className="panel">
        <Dialog.Description className="panel-description">
          Are you sure you want to delete this item?
        </Dialog.Description>
        <div className="dialog-buttons">
          <Button color='var(--red)' onClick={handleOk}>Confirm</Button>
          <Button color='var(--green)' onClick={handleCancel}>Cancel</Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default CustomDialog
