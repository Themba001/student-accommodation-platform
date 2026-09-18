import type { RegistrationValues } from '../../schemas/registration'

interface RegistrationReviewProps {
  values: RegistrationValues
  onEdit: (step: 1 | 2) => void
}

const universityLabels: Record<string, string> = {
  nwu: 'North-West University (NWU)',
  vut: 'Vaal University of Technology (VUT)',
}

const fundingLabels: Record<string, string> = {
  nsfas: 'NSFAS',
  private_bursary: 'Private Bursary',
  cash_paying: 'Cash Paying',
}

export function RegistrationReview({ values, onEdit }: RegistrationReviewProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] p-3 lg:grid-cols-2">
        <h3 className="text-lg font-semibold text-[#1f1a17] lg:col-span-2">Review your information</h3>

        <div className="min-w-0">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7c5d3a]">Personal information</h4>
          <button type="button" onClick={() => onEdit(1)} className="text-sm font-medium text-[#7c5d3a]">
            Edit
          </button>
        </div>
          <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm text-[#2c241f]">
          <div className="contents"><dt>Name</dt><dd className="min-w-0 break-words text-right">{values.name}</dd></div>
          <div className="contents"><dt>Surname</dt><dd className="min-w-0 break-words text-right">{values.surname}</dd></div>
          <div className="contents"><dt>Student number</dt><dd className="min-w-0 break-words text-right">{values.studentNumber}</dd></div>
          <div className="contents"><dt>Phone</dt><dd className="min-w-0 break-words text-right">{values.phone}</dd></div>
          <div className="contents"><dt>Email</dt><dd className="min-w-0 break-words text-right">{values.email}</dd></div>
        </dl>
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7c5d3a]">Academic & funding</h4>
          <button type="button" onClick={() => onEdit(2)} className="text-sm font-medium text-[#7c5d3a]">
            Edit
          </button>
        </div>
          <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm text-[#2c241f]">
          <div className="contents"><dt>University</dt><dd className="min-w-0 break-words text-right">{universityLabels[values.university]}</dd></div>
          <div className="contents"><dt>Funding</dt><dd className="min-w-0 break-words text-right">{fundingLabels[values.fundingMethod]}</dd></div>
        </dl>
      </div>
    </div>
  )
}
