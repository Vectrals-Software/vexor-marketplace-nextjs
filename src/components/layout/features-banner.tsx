import { styles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { FaUsersCog } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa6";
import { GrSystem } from "react-icons/gr";
import { MdMailLock } from "react-icons/md";
import { TbBrandOauth, TbPasswordUser } from "react-icons/tb";

const FeaturesBanner = () => {

  const features = [
    {
      name: 'Account Verification',
      icon: MdMailLock,
      description: 'Verification email is sent to users when they sign up to verify their email when using credentials.'
    },
    {
      name: 'OAuth Support',
      icon: TbBrandOauth,
      description: 'Integrate OAuth providers seamlessly, offering users an easier method for authentication.'
    },
    {
      name: 'Two-Factor Authentication',
      icon: FaUserLock,
      description: 'Users can add an extra layer of security by enabling 2FA (code is sent by email).'
    },
    {
      name: 'Account Linking',
      icon: FaUsersCog,
      description: 'Allow users to login either with their credentials or with an OAuth provider, linking their accounts by email.'
    },
    {
      name: 'Password Recovery',
      icon: TbPasswordUser,
      description: 'Allow users to login either with their credentials or with an OAuth provider, linking their accounts by email.'
    },
    {
      name: 'Protected API',
      icon: GrSystem,
      description: 'Not only you can define public, private and admin routes on the fontend, you can also customize your protected API routes and server actions with ease.'
    },
  ]

  return (
    <section className='border-t border-gray-200 bg-gray-50 '>
      <div className={cn(styles.container, 'py-20')}>
        <div className="grid 
grid-cols-1 gap-y-12
sm:grid-cols-2 sm:gap-x-6
lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12
">
          {features.map((feature) => (
            <div
              key={feature.name}
              className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
              <div className='md:flex-shrink-0 flex justify-center'>
                <div className='h-16 w-16 flex items-center justify-center rounded-sm bg-green-100 text-green-900'>
                  {<feature.icon className='w-1/3 h-1/3' />}
                </div>
              </div>

              <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className='text-base font-medium text-gray-900'>
                  {feature.name}
                </h3>
                <p className='mt-3 text-sm text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBanner