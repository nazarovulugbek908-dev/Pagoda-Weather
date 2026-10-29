import { Component } from 'react'
import { AlertOctagon, RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Pagoda Weather Runtime Error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-300">
              <AlertOctagon size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Kutilmagan xatolik yuz berdi
            </h2>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Dasturda xatolik aniqlandi. Iltimos, sahifani qayta yuklab ko'ring.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-3 px-4 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw size={16} />
              <span>Qayta yuklash / Reload</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

