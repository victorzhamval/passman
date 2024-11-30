import { HomeIcon, UserIcon, SignOutIcon } from '../../globals/icons';
import { Logo, LabelLogo } from '../logo/';
import useMediaQuery from '../../hooks/useMediaQuery';
import SidebarSection from './SidebarSection';
import SidebarItem from './SibebarItem';

export default function Sidebar() {
  const isScreenSmall = useMediaQuery('(max-width: 750px)');

  return (
    <aside className="sidebar">
      {isScreenSmall ? <Logo /> : <LabelLogo showVersion />}
      <SidebarSection label="Main">
        <SidebarItem
          title={!isScreenSmall && "Home"}
          Icon={HomeIcon}
          to="/"
        />
        <SidebarItem
          title={!isScreenSmall && "Account"}
          Icon={UserIcon}
          to="/account"
        />
        {/* <SidebarItem title={!isPhoneWidth && "Settings"} Icon={SettingsIcon} to="/settings" /> */}
      </SidebarSection>
      <SidebarSection label="Tools">
        <SidebarItem title={!isScreenSmall ? "Password generator" : "PG"} to="/password-generator" />
        {/* <SidebarItem title={!isPhoneWidth ? "Password security" : "PS"} to="/password-security" />*/}
        <SidebarItem title={!isScreenSmall ? "Password encryption" : "PE"} to="/password-encryption" />
      </SidebarSection>
      <SidebarSection label="">
        <SidebarItem
          title={!isScreenSmall && "Sign out"}
          Icon={SignOutIcon}
          to="/login" />
      </SidebarSection>
    </aside>
  );
}

